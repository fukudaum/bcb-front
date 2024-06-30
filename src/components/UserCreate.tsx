import { Button, Col, Form, Input, Row, Select, message, Typography } from "antd"
const { Option } = Select;
import { useNavigate } from "react-router-dom";
import { IUser } from "../context/AuthProvider/types";
import { createRequest } from "../context/AuthProvider/util";
import { MaskedInput } from "antd-mask-input";

const { Title } = Typography;

export const CreateUser = () => {
    const navigate = useNavigate();
    async function onFinish(values: IUser) {
        try {
            const user = await createRequest(values);
            if(!user) {
                message.error('Error');
            }
            navigate("/login");
        } catch (error) {
            message.error('Invalid email or password');
        }
    }

    function goBack() {
        navigate("/login");
    }

    return (
        <Row 
        justify='center'
        align='middle'
        style={{
            height: '100vh'
        }}>
            <Col span={24}>
                <Title level={2} style={{ textAlign: 'center' }}>User create</Title>
                <Form
                    name='basic'
                    labelCol={{span: 12}}
                    wrapperCol={{span: 16}}    
                    onFinish={onFinish}
                >
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Username'
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='CPF'
                        name='cpf'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your CPF!',
                            },
                        ]}
                    >
                        <MaskedInput
                            mask={'000.000.000-00'}
                        />                        
                    </Form.Item>

                    <Form.Item
                        label='CNPJ'
                        name='cnpj'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your CNPJ!',
                            },
                        ]}
                    >
                        <MaskedInput
                            mask={'00.000.000/0000-00'}
                        />
                    </Form.Item>


                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label='Phone'
                        name='phone'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Phone Number!',
                            },
                        ]}
                    >
                        <MaskedInput
                            mask={'+55 (00) 00000-0000'}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Company Name'
                        name='companyName'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Company Name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Plan Type'
                        name='planType'
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select your plan type."
                        >
                            <Option value="PRE_PAID">Pre paid</Option>
                            <Option value="POST_PAID">Post paid</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ 
                            offset: 8,
                            span: 16
                        }}
                    >
                        <Button type='primary' htmlType='submit'>
                            Create
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