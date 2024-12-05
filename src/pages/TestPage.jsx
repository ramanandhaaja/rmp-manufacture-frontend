import LayoutRightSpace from "../components/layout/LayoutRightSpace";
import Timeline from "../components/Timeline";
import PageTitle from "../components/PageTitle";

const Content = () => {
  return <div> content</div>;
};

const TestPage = () => {
  return (
    <LayoutRightSpace content={<Content />}>
      <PageTitle title={"Test page"} />

      <Timeline />
    </LayoutRightSpace>
  );
};

export default TestPage;
