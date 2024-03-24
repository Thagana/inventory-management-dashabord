import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "../store";

const { Header, Content, Footer, Sider } = Layout;

type Props = {
  children: React.ReactNode;
};

const Template = (props: Props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const navigation = useStoreState((state) => state.navigation);
  const updateNavigation = useStoreActions((action) => action.updateNavigation);
  const { children } = props;

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[navigation]}
          items={[
            {
              key: `invet`,
              icon: <ShoppingCartOutlined />,
              label: `Inventory`,
              children: [
                {
                  key: "1",
                  label: `Product`,
                  onClick: () => {
                    navigate("/products");
                    updateNavigation("1");
                  },
                },
                {
                  key: "2",
                  label: `Create Product`,
                  onClick: () => {
                    navigate("/products/add");
                    updateNavigation("2");
                  },
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Template;
