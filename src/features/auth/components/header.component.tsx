import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../store/app.state';
import { AuthState } from '../store/auth.state';

const mapStateToProps = (state: AppState): AuthState => {
    return state.auth;
};

const dispatchProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

export const HeaderComponent = (props: Props) => {
    const { user } = props;
    return (
        <>
            <p>this is a user : {user}</p>
        </>
    );
};

const connected = connect(mapStateToProps)(HeaderComponent);
export { connected as Header };