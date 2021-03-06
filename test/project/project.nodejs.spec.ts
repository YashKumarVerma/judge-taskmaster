import { execute } from '../../src/tasks/'
import { expect } from 'chai'
import { ProjectJob } from "../../src/tasks/jobs/project"

describe('project - nodejs', () => {
  it('nodejs project submits correctly', async () => {
    const result = await execute(new ProjectJob({
      id: Math.floor(Math.random() * 1000),
      lang: 'nodejs',
      source: 'https://minio.cb.lk/hackerblocks/sample-solution.zip',
      problem: 'https://minio.cb.lk/hackerblocks/sample-problem_2.zip',
      config: `
project:
  allowed-folders:
    - src/
  before-test:
    - yarn install
    - yarn build
  testcases:
    - yarn test
      `,
      scenario: 'project',
      timelimit: 60
    }))

    // assertions
    expect(result.testcases[0].score).to.eq(100)
  })
})

