# E2E Tests

This directory contains end-to-end testing workflows for the application,
implemented using Maestro. These tests provide a comprehensive way to simulate
user interactions and verify that the entire system works as expected from the
user's perspective.

The workflows were conducted on an `iPhone 15 Pro Max` emulator.

Moving forward, there are several improvements and additions planned for the E2E
tests:

- **Environment Variables**: To make the tests more flexible and maintainable,
  environment variables could be used. This allows for easy configuration of
  test parameters and can help keep sensitive data, like user credentials, out
  of the codebase.

- **Test IDs**: Currently, some tests identify elements by their coordinates
  (points) on the screen. This approach can be brittle as UI changes can cause
  these tests to fail. To make the tests more robust, the plan is to use test
  IDs to identify elements. This method is less likely to break with UI changes.

- **CI/CD Integration**: To ensure that the tests are run regularly and that
  issues are caught early, the E2E tests should be integrated into the CI/CD
  pipeline.
