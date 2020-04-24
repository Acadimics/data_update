import React, { useState } from 'react';
import { keyBy, find } from 'lodash';
import { connect } from 'react-redux';
import { Card, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { constrainsActions } from '../../../actions';
import AddConstrainModal from '../AddConstrain'

import './style.scss';

const { confirm } = Modal;

function showDeleteConfirm(constrainDescription, deleteConstrain) {
    confirm({
        title: 'Are you sure you want to delete this constrain?',
        icon: <ExclamationCircleOutlined />,
        content: `When clicked the OK button, ${constrainDescription} will be deleted`,
        onOk() {
            return deleteConstrain();
        },
        onCancel() { },
    });
}

const Constrain = ({ removeConstrain, subject, ...constrain }) => {
    const { description, scoop } = constrain;
    const [updateConstrain, setUpdateConstrain] = useState(null);

    //const bagrutsBySubjectId = keyBy(bagruts.items, 'SubjectID');

    const setModalTrigger = ({ open }) => {
        setUpdateConstrain(() => open);
    }

    const remove = () => {
        showDeleteConfirm(constrain.description, () => removeConstrain(constrain))
    }

    const onDoubleClick = (event) => {
        event.currentTarget.contains(event.target) && updateConstrain({ readOnly: true });
    }

    const renderTitle = () => (
        <>
            {description}
            <div className="buttons">
                <Button size="small" onClick={updateConstrain}> Edit </Button>
                <Button size="small" onClick={remove}> remove </Button>
            </div>
        </>
    )

    return (
        <Card title={renderTitle()} size="small" className="constrain" onDoubleClick={onDoubleClick}>
            <AddConstrainModal setTrigger={setModalTrigger} constrain={constrain} />
            <span>{scoop}</span>
            <span>{subject.SubjectName}</span>
        </Card>
    )
}

const mapStateToProps = ({ subjects }, { subjectId, scoop }) => {

    const scoopSubjects = scoop === subjects.SCOOPS.BAGRUT ? subjects.bagruts : subjects.psychometry;

    return {
        subject: find(scoopSubjects, { SubjectID: subjectId }) || {}
    }
}

export default connect(mapStateToProps, {
    removeConstrain: constrainsActions.removeConstrain
})(Constrain);