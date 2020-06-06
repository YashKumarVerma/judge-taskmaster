import { expect } from 'chai'
import * as fs from 'fs'
import { mkdir, rm } from 'shelljs'
import config = require('../../config.js')
import * as path from 'path'
import SubmissionScenario from '../../src/tasks/scenarios/submission'
import { SubmitJob } from '../../src/tasks/jobs/submission'

describe('Submission Scenario', () => {
  it('should setup', async () => {
    const source = 'print("Hello World")'

    const job: SubmitJob = {
      id: 1,
      source: (new Buffer(source)).toString('base64'),
      lang: 'py3',
      timelimit: 5,
      scenario: 'submit',
      testcases: [{
        id: 122,
        input: 'https://minio.cb.lk/public/input',
        output: 'https://minio.cb.lk/public/output'
      }]
    }

    rm('-rf', config.RUNBOX.DIR)
    mkdir('-p', config.RUNBOX.DIR)
    const currentJobDir = path.join(config.RUNBOX.DIR, job.id.toString())
    mkdir('-p', currentJobDir)

    await (new SubmissionScenario()).setup(currentJobDir, job)

    //assertions
    const stdin = fs.readFileSync(path.join(currentJobDir, 'testcases', '' + job.testcases[0].id, 'stdin')).toString()
    expect(stdin.trim()).to.eq('World')

    const stdout = () => fs.readFileSync(path.join(currentJobDir, 'testcases', '' + job.testcases[0].id, 'stdout')).toString()
    expect(stdout).to.throw()

  })
})
