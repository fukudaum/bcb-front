import { Button, Col, Form, Input, Row, message, Typography  } from "antd"
import { useAuth } from "../context/AuthProvider/useAuth"
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    async function onFinish(values: {email: string, password: string}) {
        try {
            
            await auth.authenticate(values.email, values.password);
            navigate("/menu");
        } catch (error) {
            message.error('Invalid email or password');
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
                <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
                <Form
                    name='basic'
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}    
                    onFinish={onFinish}
                >
                    <Form.Item
                        label='Email'
                        name='email'
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Password'
                        name='password'
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ 
                            offset: 8,
                            span: 16
                        }}
                    >
                        <Button type='primary' htmlType='submit'>
                            Log in
                        </Button>
                        &nbsp;Or <a href="/create">register now!</a>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}