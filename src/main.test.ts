import { run, streamrDockerDevStart } from '../src/main'

test('services input is validated', async () => {
    const services: string = ''
    process.env['INPUT_SERVICES'] = services
    expect(await streamrDockerDevStart()).toThrowError("services input can't be empty")
})
