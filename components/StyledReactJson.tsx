import {useTheme} from 'next-themes';
import dynamic from 'next/dynamic';
import {OnCopyProps} from 'react-json-view';

const ReactJson = dynamic(() => import('react-json-view'), {ssr: false});

const StyledReactJson = ({
  src,
  editable,
}: {
  src: object;
  editable?: boolean | undefined;
}) => {
  const {theme, systemTheme} = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const handleCopy = (copy: OnCopyProps) => {
    const container = document.createElement('textarea');
    const val = copy.src;

    container.innerHTML =
      typeof val === 'string' ? val : JSON.stringify(val, null, '  ');

    if (!navigator.clipboard) {
      document.body.appendChild(container);
      container.select();
      document.execCommand('copy');
      document.body.removeChild(container);
    } else {
      navigator.clipboard.writeText(container.innerHTML);
    }
  };

  return (
    <ReactJson
      name={false}
      enableClipboard={handleCopy}
      style={{
        overflow: 'auto',
        textOverflow: 'clip',
        overflowWrap: 'break-word',
        whiteSpace: 'pre-wrap',
        backgroundColor: 'transparent',
        fontFamily: 'JetBrains Mono',
        fontSize: '14px',
      }}
      theme={currentTheme === 'dark' ? 'shapeshifter' : 'shapeshifter:inverted'}
      src={src}
    />
  );
};

export default StyledReactJson;
