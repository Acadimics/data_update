import React, { useState, useEffect } from 'react';
import { includes } from 'lodash';
import { connect } from 'react-redux';
import { Modal, Button, Form, Input, Select } from 'antd';
import { constrainsActions } from '../../../actions'

import './style.scss';

const AddConstrain = ({ constrain, subjects, onSubmit, createConstrain, updateConstrain, readOnly }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedScoop, setSelectedScoop] = useState(constrain && constrain.scoop);
    const [form] = Form.useForm();

    useEffect(() => {
        constrain && form.setFieldsValue(constrain);
    }, [constrain])

    const scoops = [{ value: subjects.SCOOPS.BAGRUT }, { value: subjects.SCOOPS.PSYCHOMETRY }]

    const filterOption = (inputValue, option) =>
        includes(option.children.toUpperCase(), inputValue.toUpperCase())

    const submit = async (values) => {
        const promise = constrain ?
            updateConstrain({ ...constrain, ...values }) :
            createConstrain(values);

        setIsLoading(true);
        await promise;
        setIsLoading(false);
    }

    const onFinish = async (values) => {
        await submit(values);
        onSubmit(values);
        form.resetFields();
    }

    const renderBagrut = () => (
        <Form.Item name="subjectId"
            rules={[{ required: true, message: 'Please select bagrut subject!' }]}
            label="Subject">
            <Select showSearch optionFilterProp="children" filterOption={filterOption} disabled={readOnly} >
                {subjects.bagruts.map(({ _id, SubjectID, SubjectName }) => (
                    <Select.Option key={_id} value={SubjectID}>{SubjectName}</Select.Option>
                ))}
            </Select>
        </Form.Item>
    )

    const renderPsychometry = () => (
        <Form.Item name="subjectId"
            rules={[{ required: true, message: 'Please select bagrut subject!' }]}
            label="Subject">
            <Select showSearch optionFilterProp="children" filterOption={filterOption} disabled={readOnly} >
                {subjects.psychometry.map(({ _id, SubjectID, SubjectName }) => (
                    <Select.Option key={_id} value={SubjectID}>{SubjectName}</Select.Option>
                ))}
            </Select>
        </Form.Item>
    )

    return (
        <Form form={form} onFinish={onFinish} className="add-constrain-form" >
            <Form.Item name="scoop"
                rules={[{ required: true, message: 'Please enter description!' }]}
                label="scoop">
                <Select options={scoops} onSelect={setSelectedScoop} disabled={readOnly} >
                    {scoops.map(scoop => <Select.Option key={scoop} value={scoop}>{scoop}</Select.Option>)}
                </Select>
            </Form.Item>
            {selectedScoop === subjects.SCOOPS.BAGRUT ? renderBagrut() : renderPsychometry()}
            <Form.Item label="description"
                rules={[{ required: true, message: 'Please enter description!' }]}
                name="description">
                <Input type="text" readOnly={readOnly} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} disabled={readOnly}
                    className="submit-btn">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

const mapStateToProps = ({ constrains, subjects }) => ({
    constrains,
    subjects
})

const ConnectedAddConstrain = connect(mapStateToProps, {
    createConstrain: constrainsActions.createConstrain,
    updateConstrain: constrainsActions.updateConstrain
})(AddConstrain);

const AddConstrainModal = ({ setTrigger, constrain }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [readOnly, setIsReadOnly] = useState(false);

    useEffect(() => {
        setTrigger({ open });
    }, []);

    const title = constrain ? `Update ${constrain.description}` : 'Add Constrain';

    const onSubmit = () => {
        setIsVisible(false);
    }

    const open = ({ readOnly }) => {
        setIsReadOnly(!!readOnly);
        setIsVisible(true);
    };

    return (
        <>
            <Modal title={title}
                visible={isVisible}
                onCancel={() => setIsVisible(false)}
                footer={null}>
                <ConnectedAddConstrain onSubmit={onSubmit} constrain={constrain} readOnly={readOnly} />
            </Modal>
        </>
    )
}

export default AddConstrainModal;