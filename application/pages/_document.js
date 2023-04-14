import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body
        style={{
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          padding: '0 20px',
          backgroundColor: '#f1f1f1',
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
