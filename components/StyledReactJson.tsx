import {useTheme} from 'next-themes';
import dynamic from 'next/dynamic';

const ReactJson = dynamic(() => import('react-json-view'), {ssr: false});

const StyledReactJson = ({src}: {src: object}) => {
  const {theme, systemTheme} = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <ReactJson
      name="response"
      style={{
        overflow: 'auto',
        textOverflow: 'clip',
        overflowWrap: 'break-word',
        whiteSpace: 'pre-wrap',
        backgroundColor: 'transparent',
        fontFamily: 'JetBrains Mono',
        fontSize: '12px',
      }}
      theme={currentTheme === 'dark' ? 'summerfruit' : 'summerfruit:inverted'}
      src={src}
    />
  );
};

export default StyledReactJson;
