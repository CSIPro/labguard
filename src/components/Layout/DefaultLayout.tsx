import React, { Children } from "react";
import { Layout } from "antd";

const {Header, Footer, Sider, Content}=Layout;

const DefaultLayout : React.FC < {children: React.ReactNode,header?:any }> = ({ children, header })=> {
    return(
        <Layout style={{minHeight:"100vh"}}>
            <Header >
               {header} 
            </Header>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
            }}
          >
            {children}  {/* Renderizamos los children directamente aquí */}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Mi Pie de Página</Footer>
        </Layout>
         
        
    )
}
export default DefaultLayout