import { Button, Col, Form, Input, Row, Select, message, Modal, Typography  } from "antd"
const { Option } = Select;
import { useNavigate } from "react-router-dom";
import { addBalance, getUser, setMaxLimit, updateUser } from "../context/AuthProvider/util";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider/useAuth";
import { IUser } from "../context/AuthProvider/types";
import { MaskedInput } from "antd-mask-input";

const { Title } = Typography;

export const UserDetail = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const auth = useAuth();
    const userId = auth?.id ?? 0;

    const [isBalanceModalVisible, setIsBalanceModalVisible] = useState(false);
    const [isLimitModalVisible, setIsLimitModalVisible] = useState(false);
    const [limit, setLimit] = useState(0);
    const [balanceToAdd, setBalanceToAdd] = useState(0);

    useEffect(() => {
        if (userId) {
            getUser(userId)
                .then(user => {
                    form.setFieldsValue({
                        email: user.email,
                        username: user.username,
                        cpf: user.cpf,
                        cnpj: user.cnpj,
                        phone: user.phone,
                        companyName: user.companyName,
                        planType: user.planType,
                        balance: user.balance,
                        maxLimit: user.maxLimit,
                        messageSent: user.messageSent,
                        password: user.password,
                    });
                })
                .catch(error => {
                    console.error("Error fetching user:", error);
                    message.error("Failed to load user data.");
                });
        }

    }, [userId, form]);

    const handleAddBalance = async () => {
        const currentBalance = form.getFieldValue('balance') || 0;
        await addBalance(userId, balanceToAdd);
        form.setFieldsValue({ balance: currentBalance + balanceToAdd });
        setBalanceToAdd(0);
        setIsBalanceModalVisible(false);
    };

    const handleCancelAddBalance = () => {
        setBalanceToAdd(0);
        setIsBalanceModalVisible(false);
    }

    const handleLimit = async () => {
        form.setFieldsValue({ maxLimit: limit });
        setLimit(0);
        await setMaxLimit(userId, limit);        
        setIsLimitModalVisible(false);
    };

    const handleCancelLimit = () => {
        setLimit(0);  
        setIsLimitModalVisible(false);
    };

    const handleFinish = (values: IUser) => {
        updateUser(userId, values)
            .then(() => {
                message.success("User updated successfully!");
                navigate("/profile");
            })
            .catch(error => {
                console.error("Error updating user:", error);
                message.error("Failed to update user.");
            });
    };

    const planType = Form.useWatch("planType", form);

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
                <Title level={2} style={{ textAlign: 'center' }}>User detail</Title>
                <Form
                    form={form}
                    name='basic'
                    labelCol={{span: 12}}
                    wrapperCol={{span: 16}}    
                    onFinish={handleFinish}
                >
                    <Form.Item
                        label='Email'
                        name='email'                        
                    >
                        <Input  disabled />
                    </Form.Item>

                    <Form.Item
                        label='Username'
                        name='username'
                    >
                        <Input  disabled />
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

                    {planType === "PRE_PAID" && (
                        <Form.Item
                            label='Balance'
                            name='balance'
                        >
                            <Input.Group compact>
                                <Form.Item
                                    name='balance'
                                    noStyle
                                >
                                    <Input style={{ width: 'calc(100% - 32px)' }} disabled />
                                </Form.Item>
                                <Button 
                                    type="primary" 
                                    shape="circle"
                                    onClick={() => setIsBalanceModalVisible(true)}
                                >
                                    +
                                </Button>
                            </Input.Group>
                        </Form.Item>
                    )}
                    
                    {planType === "POST_PAID" && (
                        <>
                            <Form.Item
                                label='Message Limit'
                                name='maxLimit'
                            >
                                <Input.Group compact>
                                    <Form.Item
                                        name='maxLimit'
                                        noStyle
                                    >
                                        <Input style={{ width: 'calc(100% - 32px)' }} disabled />
                                    </Form.Item>
                                    <Button 
                                        type="primary" 
                                        shape="circle"
                                        onClick={() => setIsLimitModalVisible(true)}
                                    >
                                        +
                                    </Button>
                                </Input.Group>
                            </Form.Item>

                            <Form.Item
                                label='Messages Sent'
                                name='messageSent'
                            >
                                <Input disabled />
                            </Form.Item>
                        </>
                    )}


                    <Form.Item
                        wrapperCol={{ 
                            offset: 8,
                            span: 16
                        }}
                    >
                        <Button type='primary' htmlType='submit'>
                            Save
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

                <Modal
                    title="Add Balance"
                    open={isBalanceModalVisible}
                    onOk={handleAddBalance}
                    onCancel={handleCancelAddBalance}
                >
                    <Form.Item
                        label="Balance to add"
                        name="balanceToAdd"
                    >
                        <Input 
                            type="number"
                            value={balanceToAdd}
                            onChange={e => setBalanceToAdd(Number(e.target.value))}
                        />
                    </Form.Item>
                </Modal>

                <Modal
                    title="Change limit"
                    open={isLimitModalVisible}
                    onOk={handleLimit}
                    onCancel={handleCancelLimit}
                >
                    <Form.Item
                        label="Limit to change"
                        name="limit"
                    >
                        <Input 
                            name="limitInput"
                            type="number"
                            value={limit}
                            onChange={e => setLimit(Number(e.target.value))}
                        />
                    </Form.Item>
                </Modal>
            </Col>
        </Row>
    )
}