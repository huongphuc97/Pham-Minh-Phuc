import { useState } from 'react'
import { Button, Form, Input, Select, Space, message } from 'antd'

import prices from './data/prices.json'
import './App.css'

const App = () => {
    const numberRegex = /^[0-9]*(\.[0-9]+)?$/
    const [form] = Form.useForm()
    const [selectedValue, setSelectedValue] = useState({
        sendCurrency: 'BLUR',
        receiveCurrency: 'bNEO'
    })
    const [loading, setLoading] = useState(false)

    const getCurrencyValue = (value, selected, name) => {
        if (!value || !numberRegex.test(value)) return
        const sendCurrencyValue = prices.find(item => item.currency === (name === 'sendCurrency' ? selected : selectedValue.sendCurrency))?.price
        const receiveCurrencyValue = prices.find(item => item.currency === (name === 'receiveCurrency' ? selected : selectedValue.receiveCurrency))?.price
        return (sendCurrencyValue / receiveCurrencyValue) * Number(value)
    }

    const selectAfter = (name) => {
        const onChange = (val) => {
            setSelectedValue({
                ...selectedValue,
                [name]: val
            })
            const getFormName = name === 'sendCurrency' ? 'receiveAmount' : 'sendAmount'
            const currentCurrencyValue = form.getFieldValue(getFormName)
            const targetCurrencyValue = getCurrencyValue(currentCurrencyValue, val, name)
            form.setFieldValue(getFormName, targetCurrencyValue)
        }
        const chooseCurrency = name === 'sendCurrency' ? selectedValue.receiveCurrency : selectedValue.sendCurrency

        return (
            <Select
                value={selectedValue[name]}
                style={{ width: 130 }}
                options={
                    prices.map(item => ({
                        ...item,
                        value: item.currency,
                        disabled: item.currency === chooseCurrency,
                        label:
                            <div className={'currency-options'}>
                                <img width={20} height={20} src={`/src/assets/${item.image}`} />
                                <span>{item.currency}</span>
                            </div>,
                    }))
                }
                onChange={onChange}
            />
        )
    }

    const onValuesChange = (changedFields) => {
        const currentKey = Object.keys(changedFields)[0]
        const value = changedFields[currentKey]
        const targetCurrencyValue = getCurrencyValue(value)
        form.setFieldValue(currentKey === 'sendAmount' ? 'receiveAmount' : 'sendAmount', targetCurrencyValue)
    }

    const onFinish = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            message.success({
                type: 'success',
                content: 'Currency swapped successfully !',
            })
        }, 2000)
    }

    return (
        <div className="App">
            <span>Currency swap</span>
            <Form
                layout={"vertical"}
                form={form}
                onFinish={onFinish}
                onValuesChange={onValuesChange}
                initialValues={{
                    sendAmount: '',
                    receiveAmount: ''
                }}
            >
                <Space>
                    <Form.Item
                        label="Amount to send"
                        name="sendAmount"
                        rules={[
                            { required: true, message: 'Please fill the amount!' },
                            { pattern: numberRegex, message: 'Amount must be number' }
                        ]}
                    >
                        <Input
                            addonAfter={selectAfter('sendCurrency')}
                            placeholder="Enter amount"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Amount to receive"
                        name="receiveAmount"
                        rules={[
                            { required: true, message: 'Please fill the amount!' },
                            { pattern: numberRegex, message: 'Amount must be number' }
                        ]}
                    >
                        <Input
                            addonAfter={selectAfter('receiveCurrency')}
                            placeholder="Enter amount"
                        />
                    </Form.Item>
                </Space>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>Confirm swap</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default App