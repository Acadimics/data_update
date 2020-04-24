import React, { useEffect } from "react";
import { connect } from 'react-redux';
import {
    useHistory,
    useRouteMatch
} from "react-router-dom";
import { Tabs } from 'antd';
import { bagrutsActions } from '../../actions'
import Institutions from "../Institutions";
import Fiedls from "../Fields";
import Constrains from "../Constrains";

import './style.scss';

const TABS = {
    FIELDS: 'fields',
    INSTITUTIONS: 'institutions',
    CONSTRAINS: 'constrains',
}

const { TabPane } = Tabs;

const App = ({ fetchBagruts }) => {
    const history = useHistory();
    const { params = {} } = useRouteMatch("/:tab") || {};
    useEffect(() => {
        fetchBagruts();
    }, []);

    const tab = params.tab || TABS.FIELDS;

    const onTabClick = (key) => {
        history.push(key)
    }

    return (
        <div className="data-update-app">
            <Tabs defaultActiveKey={tab} onTabClick={onTabClick}>
                <TabPane tab="Institutions" key={TABS.INSTITUTIONS} forceRender={true}>
                    <Institutions />
                </TabPane>
                <TabPane tab="Fields" key={TABS.FIELDS} forceRender={true}>
                    <Fiedls />
                </TabPane>
                <TabPane tab="Constrains" key={TABS.CONSTRAINS} forceRender={true}>
                    <Constrains />
                </TabPane>
            </Tabs>
        </div>
    )
};

export default connect(null, {
    fetchBagruts: bagrutsActions.fetchBagruts
})(App);