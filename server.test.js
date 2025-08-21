const request = require('supertest');
const app = require('./server');

// Minimal test using only Jest's `expect` for assertions
test('POST -> GET -> PATCH -> DELETE flow (minimal expect)', async () => {
    // create
    const create = await request(app)
        .post('/notes')
        .send({ title: 'first', content: 'hello' })
        .expect(201);

    expect(create.body).toHaveProperty('index');
    const idx = create.body.index;

    // get
    const getRes = await request(app).get('/notes').expect(200);
    expect(getRes.body.notes.length).toBe(1);
    expect(getRes.body.notes[0].title).toBe('first');

    // patch
    const patchRes = await request(app)
        .patch(`/notes/${idx}`)
        .send({ title: 'updated' })
        .expect(200);
    expect(patchRes.body.note.title).toBe('updated');

    // delete
    await request(app).delete(`/notes/${idx}`).expect(200);
    const final = await request(app).get('/notes').expect(200);
    expect(final.body.notes.length).toBe(0);
});
