import ContentLoader from 'react-content-loader';

// react-content-loader를 사용하면 svg를 이용하여 placeholder loading ui를 쉽게 만들 수 있다.
// ContentLoader를 감싸면 됨.
const MyLoader = () => (
  <ContentLoader viewBox="0 038070">
    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
);

export default MyLoader;
