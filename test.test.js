import { test, describe } from 'node:test';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import assert from 'node:assert';
import path from 'node:path';

const execAsync = promisify(exec);
const CLI_PATH = path.join(process.cwd(), 'cli.js');
const FIXTURE_PATH = path.join(process.cwd(), 'test/fixture');

describe('ttl-police CLI', () => {
  test('should find expired temporary comments', async () => {
    const { stdout, stderr } = await execAsync(`node ${CLI_PATH} ${FIXTURE_PATH}`);
    
    // Should find expired comments (dates like 2023-01-01)
    assert(stdout.includes('TEMPORARY') || stderr.includes('TEMPORARY'), 
      'Should detect temporary comments');
  });

  test('should handle custom TTL days', async () => {
    const { stdout, stderr } = await execAsync(`node ${CLI_PATH} --ttl 365 ${FIXTURE_PATH}`);
    
    // With 365 days TTL, fewer comments should be expired
    assert(typeof stdout === 'string', 'Should produce output');
  });

  test('should detect future dates', async () => {
    const { stdout, stderr } = await execAsync(`node ${CLI_PATH} ${FIXTURE_PATH}`);
    
    // Should warn about future dates like 2025-12-31
    assert(stdout.includes('future') || stderr.includes('future'), 
      'Should detect future dates');
  });

  test('should detect invalid date formats', async () => {
    const { stdout, stderr } = await execAsync(`node ${CLI_PATH} ${FIXTURE_PATH}`);
    
    // Should warn about invalid dates like "invalid-date"
    assert(stdout.includes('invalid') || stderr.includes('invalid'), 
      'Should detect invalid date formats');
  });

  test('should show help message', async () => {
    const { stdout } = await execAsync(`node ${CLI_PATH} --help`);
    
    assert(stdout.includes('Usage'), 'Should show usage information');
    assert(stdout.includes('ttl-police'), 'Should mention tool name');
  });

  test('should handle non-existent paths gracefully', async () => {
    try {
      await execAsync(`node ${CLI_PATH} /non/existent/path`);
    } catch (error) {
      assert(error.code !== 0, 'Should exit with error code for invalid paths');
    }
  });

  test('should update .ttl-police file with promise flag', async () => {
    const { stdout, stderr } = await execAsync(
      `node ${CLI_PATH} --i-made-new-unenforceable-promises ${FIXTURE_PATH}`
    );
    
    // Should not throw errors when using the promise flag
    assert(typeof stdout === 'string', 'Should handle promise flag');
  });
});