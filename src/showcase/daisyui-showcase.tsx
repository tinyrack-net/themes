import type React from 'react';
import type { ShowcaseEntry } from './types.js';

export const daisyUiShowcaseEntries: ShowcaseEntry[] = [
  {
    id: 'daisyui-alert',
    name: 'alert',
    category: 'daisyUI',
    description: 'daisyUI alert themed preview',
    render: () => (
      <div role="alert" className="alert alert-info">
        <span>Alert message</span>
      </div>
    ),
  },
  {
    id: 'daisyui-avatar',
    name: 'avatar',
    category: 'daisyUI',
    description: 'daisyUI avatar themed preview',
    render: () => (
      <div className="avatar avatar-placeholder">
        <div className="bg-primary text-primary-content w-12 rounded-full">
          <span>TR</span>
        </div>
      </div>
    ),
  },
  {
    id: 'daisyui-badge',
    name: 'badge',
    category: 'daisyUI',
    description: 'daisyUI badge themed preview',
    render: () => <span className="badge badge-primary">Badge</span>,
  },
  {
    id: 'daisyui-breadcrumbs',
    name: 'breadcrumbs',
    category: 'daisyUI',
    description: 'daisyUI breadcrumbs themed preview',
    render: () => (
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a href="#daisyui-breadcrumbs-home">Home</a>
          </li>
          <li>Themes</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'daisyui-button',
    name: 'button',
    category: 'daisyUI',
    description: 'daisyUI button themed preview',
    render: () => (
      <button className="btn btn-primary" type="button">
        Button
      </button>
    ),
  },
  {
    id: 'daisyui-calendar',
    name: 'calendar',
    category: 'daisyUI',
    description: 'daisyUI calendar themed preview',
    render: () => (
      <div className="mockup-code text-xs">
        <pre data-prefix=">">
          <code>calendar class preview</code>
        </pre>
      </div>
    ),
  },
  {
    id: 'daisyui-card',
    name: 'card',
    category: 'daisyUI',
    description: 'daisyUI card themed preview',
    render: () => (
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <h3 className="card-title">Card</h3>
          <p>Card content</p>
        </div>
      </div>
    ),
  },
  {
    id: 'daisyui-carousel',
    name: 'carousel',
    category: 'daisyUI',
    description: 'daisyUI carousel themed preview',
    render: () => (
      <div className="carousel w-full max-w-xs">
        <div className="carousel-item w-full">
          <div className="bg-primary text-primary-content p-6 w-full text-center">
            Slide
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'daisyui-chat',
    name: 'chat',
    category: 'daisyUI',
    description: 'daisyUI chat themed preview',
    render: () => (
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-primary">Chat bubble</div>
      </div>
    ),
  },
  {
    id: 'daisyui-checkbox',
    name: 'checkbox',
    category: 'daisyUI',
    description: 'daisyUI checkbox themed preview',
    render: () => (
      <input
        aria-label="Checkbox"
        type="checkbox"
        defaultChecked
        className="checkbox checkbox-primary"
      />
    ),
  },
  {
    id: 'daisyui-collapse',
    name: 'collapse',
    category: 'daisyUI',
    description: 'daisyUI collapse themed preview',
    render: () => (
      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title">Collapse</div>
        <div className="collapse-content">Content</div>
      </div>
    ),
  },
  {
    id: 'daisyui-countdown',
    name: 'countdown',
    category: 'daisyUI',
    description: 'daisyUI countdown themed preview',
    render: () => (
      <span className="countdown font-mono text-2xl">
        <span style={{ '--value': 42 } as React.CSSProperties} aria-live="polite">
          42
        </span>
      </span>
    ),
  },
  {
    id: 'daisyui-diff',
    name: 'diff',
    category: 'daisyUI',
    description: 'daisyUI diff themed preview',
    render: () => (
      <div className="diff aspect-16/9 max-h-24">
        <div className="diff-item-1">
          <div className="bg-primary text-primary-content grid place-content-center text-sm">
            Before
          </div>
        </div>
        <div className="diff-item-2">
          <div className="bg-secondary text-secondary-content grid place-content-center text-sm">
            After
          </div>
        </div>
        <div className="diff-resizer" />
      </div>
    ),
  },
  {
    id: 'daisyui-divider',
    name: 'divider',
    category: 'daisyUI',
    description: 'daisyUI divider themed preview',
    render: () => <div className="divider">Divider</div>,
  },
  {
    id: 'daisyui-dock',
    name: 'dock',
    category: 'daisyUI',
    description: 'daisyUI dock themed preview',
    render: () => (
      <div className="dock dock-xs relative">
        <button type="button">⌂</button>
        <button type="button" className="dock-active">
          ★
        </button>
      </div>
    ),
  },
  {
    id: 'daisyui-drawer',
    name: 'drawer',
    category: 'daisyUI',
    description: 'daisyUI drawer themed preview',
    render: () => (
      <div className="drawer drawer-open">
        <input
          aria-label="drawer"
          type="checkbox"
          className="drawer-toggle"
          defaultChecked
        />
        <div className="drawer-content p-2">Drawer content</div>
        <div className="drawer-side relative">
          <div aria-hidden="true" className="drawer-overlay" />
          <ul className="menu bg-base-200 min-h-full w-32 p-2">
            <li>
              <a href="#daisyui-drawer-item">Item</a>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'daisyui-dropdown',
    name: 'dropdown',
    category: 'daisyUI',
    description: 'daisyUI dropdown themed preview',
    render: () => (
      <div className="dropdown dropdown-open">
        <button tabIndex={0} className="btn btn-sm" type="button">
          Dropdown
        </button>
        <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-2 shadow">
          <li>
            <a href="#daisyui-dropdown-item">Item</a>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 'daisyui-fab',
    name: 'fab',
    category: 'daisyUI',
    description: 'daisyUI fab themed preview',
    render: () => (
      <button
        className="btn btn-circle btn-primary"
        type="button"
        aria-label="Floating action"
      >
        +
      </button>
    ),
  },
  {
    id: 'daisyui-fieldset',
    name: 'fieldset',
    category: 'daisyUI',
    description: 'daisyUI fieldset themed preview',
    render: () => (
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Fieldset</legend>
        <input className="input" placeholder="Input" />
      </fieldset>
    ),
  },
  {
    id: 'daisyui-fileinput',
    name: 'fileinput',
    category: 'daisyUI',
    description: 'daisyUI fileinput themed preview',
    render: () => (
      <input
        aria-label="File input"
        type="file"
        className="file-input file-input-primary"
      />
    ),
  },
  {
    id: 'daisyui-filter',
    name: 'filter',
    category: 'daisyUI',
    description: 'daisyUI filter themed preview',
    render: () => (
      <div className="filter">
        <input
          className="btn filter-reset"
          type="radio"
          name="daisy-filter"
          aria-label="All"
        />
        <input className="btn" type="radio" name="daisy-filter" aria-label="Tag" />
      </div>
    ),
  },
  {
    id: 'daisyui-footer',
    name: 'footer',
    category: 'daisyUI',
    description: 'daisyUI footer themed preview',
    render: () => (
      <footer className="footer bg-base-200 p-4">
        <aside>
          <p>Tinyrack Themes</p>
        </aside>
      </footer>
    ),
  },
  {
    id: 'daisyui-hero',
    name: 'hero',
    category: 'daisyUI',
    description: 'daisyUI hero themed preview',
    render: () => (
      <div className="hero bg-base-200 min-h-32">
        <div className="hero-content text-center">
          <div>
            <h3 className="text-xl font-bold">Hero</h3>
            <p>Theme preview</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'daisyui-hover3d',
    name: 'hover3d',
    category: 'daisyUI',
    description: 'daisyUI hover3d themed preview',
    render: () => (
      <div className="hover-3d">
        <div className="card bg-primary text-primary-content p-4">Hover 3D</div>
      </div>
    ),
  },
  {
    id: 'daisyui-hovergallery',
    name: 'hovergallery',
    category: 'daisyUI',
    description: 'daisyUI hovergallery themed preview',
    render: () => (
      <div className="hovergallery">
        <img
          alt="gallery"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 48'%3E%3Crect width='80' height='48' fill='%231762ae'/%3E%3C/svg%3E"
        />
      </div>
    ),
  },
  {
    id: 'daisyui-indicator',
    name: 'indicator',
    category: 'daisyUI',
    description: 'daisyUI indicator themed preview',
    render: () => (
      <div className="indicator">
        <span className="indicator-item badge badge-secondary">new</span>
        <button className="btn" type="button">
          Inbox
        </button>
      </div>
    ),
  },
  {
    id: 'daisyui-input',
    name: 'input',
    category: 'daisyUI',
    description: 'daisyUI input themed preview',
    render: () => <input className="input input-primary" placeholder="Input" />,
  },
  {
    id: 'daisyui-kbd',
    name: 'kbd',
    category: 'daisyUI',
    description: 'daisyUI kbd themed preview',
    render: () => <kbd className="kbd">⌘</kbd>,
  },
  {
    id: 'daisyui-label',
    name: 'label',
    category: 'daisyUI',
    description: 'daisyUI label themed preview',
    render: () => (
      <label className="label">
        <span>Label</span>
        <input className="input" placeholder="Value" />
      </label>
    ),
  },
  {
    id: 'daisyui-link',
    name: 'link',
    category: 'daisyUI',
    description: 'daisyUI link themed preview',
    render: () => (
      <a className="link link-primary" href="#daisyui-link-preview">
        Tinyrack link
      </a>
    ),
  },
  {
    id: 'daisyui-list',
    name: 'list',
    category: 'daisyUI',
    description: 'daisyUI list themed preview',
    render: () => (
      <ul className="list bg-base-100 rounded-box shadow">
        <li className="list-row">List item</li>
      </ul>
    ),
  },
  {
    id: 'daisyui-loading',
    name: 'loading',
    category: 'daisyUI',
    description: 'daisyUI loading themed preview',
    render: () => (
      <span
        aria-label="Loading"
        className="loading loading-spinner loading-md"
        role="status"
      />
    ),
  },
  {
    id: 'daisyui-mask',
    name: 'mask',
    category: 'daisyUI',
    description: 'daisyUI mask themed preview',
    render: () => <div className="mask mask-squircle bg-primary w-16 h-16" />,
  },
  {
    id: 'daisyui-menu',
    name: 'menu',
    category: 'daisyUI',
    description: 'daisyUI menu themed preview',
    render: () => (
      <ul className="menu bg-base-200 rounded-box w-48">
        <li>
          <a href="#daisyui-menu-item">Menu item</a>
        </li>
        <li>
          <a href="#daisyui-menu-second-item">Second item</a>
        </li>
      </ul>
    ),
  },
  {
    id: 'daisyui-mockup',
    name: 'mockup',
    category: 'daisyUI',
    description: 'daisyUI mockup themed preview',
    render: () => (
      <div className="mockup-code">
        <pre data-prefix="$">
          <code>pnpm test</code>
        </pre>
      </div>
    ),
  },
  {
    id: 'daisyui-modal',
    name: 'modal',
    category: 'daisyUI',
    description: 'daisyUI modal themed preview',
    render: () => (
      <div className="modal modal-open relative">
        <div className="modal-box">
          <h3 className="font-bold">Modal</h3>
          <p>Modal content</p>
        </div>
      </div>
    ),
  },
  {
    id: 'daisyui-navbar',
    name: 'navbar',
    category: 'daisyUI',
    description: 'daisyUI navbar themed preview',
    render: () => (
      <div className="navbar bg-base-200 rounded-box">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl" href="#daisyui-navbar-home">
            Tinyrack
          </a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost" type="button">
            ☰
          </button>
        </div>
      </div>
    ),
  },
  {
    id: 'daisyui-progress',
    name: 'progress',
    category: 'daisyUI',
    description: 'daisyUI progress themed preview',
    render: () => (
      <progress className="progress progress-primary w-56" value="70" max="100" />
    ),
  },
  {
    id: 'daisyui-radialprogress',
    name: 'radialprogress',
    category: 'daisyUI',
    description: 'daisyUI radialprogress themed preview',
    render: () => (
      <div
        className="radial-progress text-primary"
        style={{ '--value': 70 } as React.CSSProperties}
        aria-valuenow={70}
        role="progressbar"
      >
        70%
      </div>
    ),
  },
  {
    id: 'daisyui-radio',
    name: 'radio',
    category: 'daisyUI',
    description: 'daisyUI radio themed preview',
    render: () => (
      <input
        aria-label="Radio"
        type="radio"
        name="radio-preview"
        defaultChecked
        className="radio radio-primary"
      />
    ),
  },
  {
    id: 'daisyui-range',
    name: 'range',
    category: 'daisyUI',
    description: 'daisyUI range themed preview',
    render: () => (
      <input
        aria-label="Range"
        type="range"
        min="0"
        max="100"
        defaultValue="60"
        className="range range-primary"
      />
    ),
  },
  {
    id: 'daisyui-rating',
    name: 'rating',
    category: 'daisyUI',
    description: 'daisyUI rating themed preview',
    render: () => (
      <div className="rating">
        <input
          type="radio"
          name="rating-preview"
          className="mask mask-star-2 bg-orange-400"
          aria-label="1 star"
        />
        <input
          type="radio"
          name="rating-preview"
          className="mask mask-star-2 bg-orange-400"
          aria-label="2 stars"
          defaultChecked
        />
      </div>
    ),
  },
  {
    id: 'daisyui-select',
    name: 'select',
    category: 'daisyUI',
    description: 'daisyUI select themed preview',
    render: () => (
      <select className="select select-primary" defaultValue="theme">
        <option value="theme">Theme</option>
      </select>
    ),
  },
  {
    id: 'daisyui-skeleton',
    name: 'skeleton',
    category: 'daisyUI',
    description: 'daisyUI skeleton themed preview',
    render: () => <div className="skeleton h-12 w-full" />,
  },
  {
    id: 'daisyui-stack',
    name: 'stack',
    category: 'daisyUI',
    description: 'daisyUI stack themed preview',
    render: () => (
      <div className="stack">
        <div className="card bg-primary text-primary-content p-4">1</div>
        <div className="card bg-secondary text-secondary-content p-4">2</div>
      </div>
    ),
  },
  {
    id: 'daisyui-stat',
    name: 'stat',
    category: 'daisyUI',
    description: 'daisyUI stat themed preview',
    render: () => (
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Themes</div>
          <div className="stat-value">3</div>
        </div>
      </div>
    ),
  },
  {
    id: 'daisyui-status',
    name: 'status',
    category: 'daisyUI',
    description: 'daisyUI status themed preview',
    render: () => (
      <div className="flex items-center gap-2">
        <span className="status status-success" /> Ready
      </div>
    ),
  },
  {
    id: 'daisyui-steps',
    name: 'steps',
    category: 'daisyUI',
    description: 'daisyUI steps themed preview',
    render: () => (
      <ul className="steps">
        <li className="step step-primary">Tokens</li>
        <li className="step step-primary">Adapters</li>
        <li className="step">Apps</li>
      </ul>
    ),
  },
  {
    id: 'daisyui-swap',
    name: 'swap',
    category: 'daisyUI',
    description: 'daisyUI swap themed preview',
    render: () => (
      <label className="swap swap-rotate">
        <input type="checkbox" defaultChecked />
        <span className="swap-on">ON</span>
        <span className="swap-off">OFF</span>
      </label>
    ),
  },
  {
    id: 'daisyui-tab',
    name: 'tab',
    category: 'daisyUI',
    description: 'daisyUI tab themed preview',
    render: () => (
      <div role="tablist" className="tabs tabs-box">
        <button role="tab" className="tab tab-active" type="button">
          Tab
        </button>
        <button role="tab" className="tab" type="button">
          Other
        </button>
      </div>
    ),
  },
  {
    id: 'daisyui-table',
    name: 'table',
    category: 'daisyUI',
    description: 'daisyUI table themed preview',
    render: () => (
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Theme</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 'daisyui-textarea',
    name: 'textarea',
    category: 'daisyUI',
    description: 'daisyUI textarea themed preview',
    render: () => (
      <textarea className="textarea textarea-primary" defaultValue="Textarea" />
    ),
  },
  {
    id: 'daisyui-textrotate',
    name: 'textrotate',
    category: 'daisyUI',
    description: 'daisyUI textrotate themed preview',
    render: () => (
      <span className="text-rotate">
        <span>Rotate</span>
      </span>
    ),
  },
  {
    id: 'daisyui-timeline',
    name: 'timeline',
    category: 'daisyUI',
    description: 'daisyUI timeline themed preview',
    render: () => (
      <ul className="timeline">
        <li>
          <div className="timeline-start">Tokens</div>
          <div className="timeline-middle">●</div>
          <div className="timeline-end">Theme</div>
        </li>
      </ul>
    ),
  },
  {
    id: 'daisyui-toast',
    name: 'toast',
    category: 'daisyUI',
    description: 'daisyUI toast themed preview',
    render: () => (
      <div className="toast toast-start relative">
        <div className="alert alert-success">
          <span>Toast</span>
        </div>
      </div>
    ),
  },
  {
    id: 'daisyui-toggle',
    name: 'toggle',
    category: 'daisyUI',
    description: 'daisyUI toggle themed preview',
    render: () => (
      <input
        aria-label="Toggle"
        type="checkbox"
        defaultChecked
        className="toggle toggle-primary"
      />
    ),
  },
  {
    id: 'daisyui-tooltip',
    name: 'tooltip',
    category: 'daisyUI',
    description: 'daisyUI tooltip themed preview',
    render: () => (
      <div className="tooltip tooltip-open" data-tip="Tooltip">
        <button className="btn" type="button">
          Hover
        </button>
      </div>
    ),
  },
  {
    id: 'daisyui-validator',
    name: 'validator',
    category: 'daisyUI',
    description: 'daisyUI validator themed preview',
    render: () => (
      <input
        className="input validator"
        required
        type="email"
        defaultValue="hello@tinyrack.net"
      />
    ),
  },
];
