import {execute} from '../../src/tasks/'
import {expect} from 'chai'
import {RunJob} from '../../src/tasks/jobs/run'


describe('run - nodejs8', () => {
  it('.js file runs correctly (NodeJS 8)', async () => {
    const runResult = await execute(new RunJob({
      id: Math.floor(Math.random() * 1000),
      lang: 'nodejs8',
      source: (new Buffer(`
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
rl.on('line', function (line) {
  console.log("Hello " + line);
});
      `)).toString('base64'),
      scenario: 'run',
      stdin: (new Buffer('World')).toString('base64')
    }))
    expect(new Buffer(runResult.stdout, 'base64').toString('ascii')).to.eq('Hello World\n')
  })
})
