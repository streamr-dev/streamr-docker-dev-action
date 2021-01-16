import * as core from '@actions/core'
import * as exec from '@actions/exec'
import { cleanup } from './post'

const isPost = !!process.env['STATE_isPost']
core.info(`isPost=${isPost} env.STATE_isPost=process.env['STATE_isPost']`)
if (!isPost) {
    run()
} else {
    cleanup()
}

export async function run(): Promise<void> {
    try {
        await gitCheckoutStreamrDockerDev()
        await copyStreamrDockerDevScript()
        await addStreamrDockerDevToOsPath()
        await configureDockerNetworking()
        await streamrDockerDevStart()
        await streamrDockerDevWait()
    } catch (error) {
        core.setFailed(error.message)
    }
}

async function gitCheckoutStreamrDockerDev(): Promise<void> {
    const args: string[] = [
        'clone',
        '--depth',
        '1',
        'https://github.com/streamr-dev/streamr-docker-dev.git',
    ]
    const exitCode: number = await exec.exec('git', args)
    core.info(`git clone streamr-docker-dev exit code: ${exitCode}`)
}

async function copyStreamrDockerDevScript(): Promise<void> {
    const args: string[] = [
        'streamr-docker-dev/bin.sh',
        'streamr-docker-dev/streamr-docker-dev',
    ]
    const options: exec.ExecOptions = {
        cwd: 'streamr-docker-dev',
    }
    const exitCode: number = await exec.exec('cp', args, options)
    core.info(`copy streamr-docker-dev script exit code: ${exitCode}`)
}

async function addStreamrDockerDevToOsPath(): Promise<void> {
    const cwd = process.cwd()
    const path = `${cwd}/streamr-docker-dev/streamr-docker-dev`
    core.addPath(path)
}

async function configureDockerNetworking(): Promise<void> {
    const args: string[] = [
        'ifconfig',
        'docker0',
        '10.200.10.1/24',
    ]
    const exitCode: number = await exec.exec('sudo', args)
    core.info(`ifconfig docker networking exit code: ${exitCode}`)
}

export async function streamrDockerDevStart(): Promise<void> {
    const inputOptions: core.InputOptions = {
        required: false,
    }
    const s: string = core.getInput('services', inputOptions)
    if (s === null || s.length < 1) {
        throw new Error("services input can't be empty")
    }

    const args: string[] = [
        'start',
        ...s.split(' ')
    ]
    const exitCode: number = await exec.exec('streamr-docker-dev', args)
    core.info(`streamr-docker-dev start services exit code: ${exitCode}`)
}

async function streamrDockerDevWait(): Promise<void> {
    const args: string[] = [
        'wait',
    ]
    const exitCode: number = await exec.exec('streamr-docker-dev', args)
    core.info(`streamr-docker-dev wait exit code: ${exitCode}`)
}
