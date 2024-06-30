import { Button, Checkbox, Col, Form, Input, Row, message, Typography } from "antd"
import { useNavigate } from "react-router-dom";
import { sendMessage } from "../context/AuthProvider/util";
import { useAuth } from "../context/AuthProvider/useAuth";

const { Title } = Typography;

export const Message = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const userId = auth?.id ?? 0;
    async function onFinish(values: {phone: string, text: string, iswhatsapp: boolean}) {
        try {
            const messageResponse = await sendMessage(values.iswhatsapp, values.phone, values.text, userId);

            if(messageResponse) {
                message.info(messageResponse.data.msg);
            }
            navigate("/message");
        } catch (error) {
            message.error('Invalid phone number');
        }
    }

    function goBack() {
        navigate("/menu");
    }

    return (
        <Row 
        justify='center'
        align='middle'
        style={{
            height: '100vh'
        }}>
            <Col span={24}>
                <Title level={2} style={{ textAlign: 'center' }}>Message</Title>
                <Form
                    name='basic'
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}    
                    onFinish={onFinish}
                >
                    <Form.Item
                        label='Phone'
                        name='phone'
                        rules={[
                            {
                              required: true,
                            },
                          ]}                        
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="iswhatsapp" valuePropName="checked" noStyle>
                        <Checkbox>Is whatsapp?</Checkbox>
                    </Form.Item>
                    <Form.Item
                        label='Message'
                        name='text'
                        rules={[
                            {
                              required: true,
                              message: 'Please input Message',
                            },
                          ]}
                    >
                        <Input.TextArea showCount maxLength={100} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ 
                            offset: 8,
                            span: 16
                        }}
                    >
                        <Button type='primary' htmlType='submit'>
                            Send
                        </Button>

                        <Button 
                            htmlType='button' 
                            style={{
                                margin: '0 8px',
                            }}
                            onClick={goBack}
                        >
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}