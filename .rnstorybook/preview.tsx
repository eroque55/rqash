import type { Preview } from '@storybook/react';

import Decorator from './Decorator';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    Story => {
      return (
        <Decorator>
          <Story />
        </Decorator>
      );
    },
  ],
};

export default preview;
