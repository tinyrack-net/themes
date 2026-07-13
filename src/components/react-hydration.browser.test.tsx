import { act } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server.browser';
import { expect, test } from 'vitest';
import { Accordion } from './accordion/index.js';
import { Avatar } from './avatar/index.js';
import { Button } from './button/index.js';
import { Combobox } from './combobox/index.js';
import { Disclosure } from './disclosure/index.js';
import { Form } from './form/index.js';
import { Menu } from './menu/index.js';
import { Modal } from './modal/index.js';
import { PinInput } from './pin-input/index.js';
import { Popover } from './popover/index.js';
import { Progress } from './progress/index.js';
import { Tabs } from './tabs/index.js';
import { Toast } from './toast/index.js';
import { Tooltip } from './tooltip/index.js';

const actEnvironment = globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT?: boolean;
};

function InteractiveFixture() {
  return (
    <div>
      <Accordion.Root defaultValue={['one']}>
        <Accordion.Item value="one">
          <Accordion.Header>
            <Accordion.Trigger>Accordion</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel>Panel</Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>
      <Avatar.Root>
        <Avatar.Image alt="Profile" src="/avatar.png" />
        <Avatar.Fallback>TR</Avatar.Fallback>
      </Avatar.Root>
      <Button>Save</Button>
      <Combobox.Root items={['Rack A']}>
        <Combobox.Input aria-label="Rack" />
        <Combobox.Trigger>Choose rack</Combobox.Trigger>
      </Combobox.Root>
      <Disclosure.Root>
        <Disclosure.Trigger>Details</Disclosure.Trigger>
        <Disclosure.Panel>Content</Disclosure.Panel>
      </Disclosure.Root>
      <Form.Field>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" />
      </Form.Field>
      <Menu.Root>
        <Menu.Trigger>Actions</Menu.Trigger>
      </Menu.Root>
      <Modal.Root>
        <Modal.Trigger>Open modal</Modal.Trigger>
      </Modal.Root>
      <PinInput.Root aria-label="Code" length={2}>
        <PinInput.Input />
        <PinInput.Input />
      </PinInput.Root>
      <Popover.Root>
        <Popover.Trigger>Open popover</Popover.Trigger>
      </Popover.Root>
      <Progress.Root aria-label="Upload" value={25}>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
      <Tabs.Root defaultValue="one">
        <Tabs.List>
          <Tabs.Trigger value="one">One</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Panel value="one">Tab panel</Tabs.Panel>
      </Tabs.Root>
      <Toast.Provider />
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger>Help</Tooltip.Trigger>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
}

test('interactive components render on the server and hydrate without recovery', async () => {
  actEnvironment.IS_REACT_ACT_ENVIRONMENT = true;
  const serverMarkup = renderToString(<InteractiveFixture />);
  const host = document.createElement('div');
  host.innerHTML = serverMarkup;
  document.body.append(host);
  const hydrationErrors: unknown[] = [];

  const root = hydrateRoot(host, <InteractiveFixture />, {
    onRecoverableError(error) {
      hydrationErrors.push(error);
    },
  });

  await act(async () => {});
  expect(hydrationErrors).toEqual([]);
  expect(host.querySelectorAll('button').length).toBeGreaterThan(0);

  await act(async () => root.unmount());
  host.remove();
  actEnvironment.IS_REACT_ACT_ENVIRONMENT = false;
});
