export const componentDocCapabilities = [
  'responsive',
  'keyboard',
  'validation',
  'overflow',
] as const;

export type ComponentDocCapability = (typeof componentDocCapabilities)[number];

export type ComponentDocsManifestEntry = {
  capabilities: readonly ComponentDocCapability[];
  file: string;
  id: string;
  requiredExamples: readonly string[];
  storyId: string;
  title: string;
};

export const componentDocsManifest = [
  {
    capabilities: ['responsive'],
    file: 'stories/components/badge.docs.mdx',
    id: 'badge',
    requiredExamples: ['badge-basic', 'badge-size-variant', 'badge-content'],
    storyId: 'components-badge--docs',
    title: 'Badge',
  },
  {
    capabilities: ['responsive', 'keyboard'],
    file: 'stories/components/button.docs.mdx',
    id: 'button',
    requiredExamples: [
      'button-basic',
      'button-size',
      'button-variant',
      'button-appearance-solid',
      'button-appearance-outline',
      'button-appearance-ghost',
      'button-states-icons',
    ],
    storyId: 'components-button--docs',
    title: 'Button',
  },
  {
    capabilities: ['responsive', 'overflow'],
    file: 'stories/components/code-block.docs.mdx',
    id: 'code-block',
    requiredExamples: [
      'code-block-basic',
      'code-block-languages',
      'code-block-wrapping',
    ],
    storyId: 'components-codeblock--docs',
    title: 'CodeBlock',
  },
  {
    capabilities: ['responsive', 'overflow'],
    file: 'stories/components/code.docs.mdx',
    id: 'code',
    requiredExamples: ['code-basic', 'code-inline-contexts', 'code-command-path-token'],
    storyId: 'components-code--docs',
    title: 'Code',
  },
  {
    capabilities: ['keyboard', 'validation'],
    file: 'stories/components/form-checkbox.docs.mdx',
    id: 'form-checkbox',
    requiredExamples: [
      'form-checkbox-basic',
      'form-checkbox-size',
      'form-checkbox-state',
    ],
    storyId: 'components-form-checkbox--docs',
    title: 'Checkbox',
  },
  {
    capabilities: ['responsive', 'validation'],
    file: 'stories/components/form-field.docs.mdx',
    id: 'form-field',
    requiredExamples: [
      'form-field-basic',
      'form-field-size',
      'form-field-message-variant',
    ],
    storyId: 'components-form-field--docs',
    title: 'Field',
  },
  {
    capabilities: ['responsive', 'keyboard', 'validation'],
    file: 'stories/components/form-input.docs.mdx',
    id: 'form-input',
    requiredExamples: [
      'form-input-basic',
      'form-input-type-gallery',
      'form-input-size',
      'form-input-state',
    ],
    storyId: 'components-form-input--docs',
    title: 'Input',
  },
  {
    capabilities: ['responsive', 'keyboard', 'validation'],
    file: 'stories/components/form-radio.docs.mdx',
    id: 'form-radio',
    requiredExamples: [
      'form-radio-basic',
      'form-radio-orientation',
      'form-radio-size',
      'form-radio-state',
    ],
    storyId: 'components-form-radio--docs',
    title: 'Radio',
  },
  {
    capabilities: ['keyboard', 'validation'],
    file: 'stories/components/form-select.docs.mdx',
    id: 'form-select',
    requiredExamples: ['form-select-basic', 'form-select-size', 'form-select-state'],
    storyId: 'components-form-select--docs',
    title: 'Select',
  },
  {
    capabilities: ['keyboard', 'validation'],
    file: 'stories/components/form-switch.docs.mdx',
    id: 'form-switch',
    requiredExamples: ['form-switch-basic', 'form-switch-size', 'form-switch-state'],
    storyId: 'components-form-switch--docs',
    title: 'Switch',
  },
  {
    capabilities: ['responsive', 'keyboard', 'validation'],
    file: 'stories/components/form-textarea.docs.mdx',
    id: 'form-textarea',
    requiredExamples: [
      'form-textarea-basic',
      'form-textarea-size',
      'form-textarea-rows-state',
    ],
    storyId: 'components-form-textarea--docs',
    title: 'Textarea',
  },
  {
    capabilities: ['responsive', 'keyboard', 'validation'],
    file: 'stories/components/form.docs.mdx',
    id: 'form',
    requiredExamples: [
      'form-basic',
      'form-primitive-gallery',
      'form-size-matrix',
      'form-state-matrix',
    ],
    storyId: 'components-form-overview--docs',
    title: 'Form',
  },
  {
    capabilities: ['responsive', 'keyboard'],
    file: 'stories/components/link.docs.mdx',
    id: 'link',
    requiredExamples: ['link-basic', 'link-underline-variant', 'link-mdx'],
    storyId: 'components-link--docs',
    title: 'Link',
  },
  {
    capabilities: ['responsive', 'overflow'],
    file: 'stories/components/table.docs.mdx',
    id: 'table',
    requiredExamples: [
      'table-basic',
      'table-density',
      'table-striped',
      'table-responsive-overflow',
    ],
    storyId: 'components-table--docs',
    title: 'Table',
  },
  {
    capabilities: ['responsive', 'keyboard', 'overflow'],
    file: 'stories/components/tabs.docs.mdx',
    id: 'tabs',
    requiredExamples: [
      'tabs-basic',
      'tabs-size',
      'tabs-orientation',
      'tabs-activation',
      'tabs-responsive-overflow',
    ],
    storyId: 'components-tabs--docs',
    title: 'Tabs',
  },
] as const satisfies readonly ComponentDocsManifestEntry[];
