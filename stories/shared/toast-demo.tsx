import { Button } from '../../src/components/button/react.js';
import type { ToastVariant } from '../../src/components/toast/contract.js';
import { useToast } from '../../src/components/toast/react.js';

export function ToastDemo({ variant = 'info' }: { variant?: ToastVariant }) {
  const toast = useToast();

  return (
    <Button
      onClick={() =>
        toast.show({
          description: 'Rack configuration is current.',
          title: 'Settings saved',
          variant,
        })
      }
    >
      Show notification
    </Button>
  );
}
