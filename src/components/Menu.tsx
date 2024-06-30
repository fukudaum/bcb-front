import { Button, Col, Form, Row, message } from "antd"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider/useAuth";

export const Menu = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    function goProfile() {
        try {            
            navigate("/profile");
        } catch (error) {
            message.error(JSON.stringify(error));
        }
    }

    function goMessage() {
        try {            
            navigate("/message");
        } catch (error) {
            message.error(JSON.stringify(error));
        }
    }

    function logout() {
        try {
            auth.logout();
            navigate("/login");
        } catch (error) {
            message.error(JSON.stringify(error));
        }
    }

    return (
        <Row 
        justify='center'
        align='middle'
        style={{
            height: '100vh'
        }}>
            <Col span={24}>
                <Form
                    name='basic'
                    labelCol={{span: 12}}
                    wrapperCol={{span: 16}}    
                >
                    <Form.Item
                        wrapperCol={{ 
                            offset: 8,
                            span: 16
                        }}
                    >
                        <Button 
                            htmlType='button'
                            onClick={goProfile}
                        >
                            Profile
                        </Button>                        
                        <Button 
                            htmlType='button' 
                            onClick={goMessage}
                        >
                            Message
                        </Button>
                        <Button 
                            htmlType='button' 
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}