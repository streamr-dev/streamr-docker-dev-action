import * as core from '@actions/core'
import * as exec from '@actions/exec'

export async function cleanup(): Promise<void> {
    try {
        await streamrDockerDevStop()
    } catch (error) {
        core.setFailed(error.message)
    }
}

async function streamrDockerDevStop(): Promise<void> {
    const args: string[] = [
        'stop',
    ]
    const exitCode: number = await exec.exec('streamr-docker-dev', args)
    core.info(`streamr-docker-dev stop exit code: ${exitCode}`)
}
