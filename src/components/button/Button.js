import React, {Fragment, useMemo} from 'react';
import {InlineButton, RegularButton} from './Button.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

function Button({variant, children, ...props}) { // type dla button jest zarezerwowany
    const {to} = props; // wyciągamy z propsów samo to
    const Component = useMemo(() => { // musi być funkcja strzałowa, żeby switch działał, useMemo, żeby przerenderowywał tylko gdy variant się zmieni
        switch (variant) {
            case 'Inline':
                return InlineButton
            default:
                return RegularButton
        }
    },[variant]); // od razu ją wywołać

    const Content = useMemo(()=>( // żeby nie tworzył tego komponentu, jeżeli nie zmienia się props i children
        <Component {...props}>
        {children}
        </Component>
    ), [props, children]);

    return to ? ( // jeżeli w propsach jest "to", to używaj linka
        <Link {...props}>            
            {Content}
        </Link>
    ) : ( // Fragment, że react nie myślał, że zwaracamy obiekt
        <Fragment> 
            {Content} 
        </Fragment>)
}

Button.propTypes = {
    variant: PropTypes.oneOf(['Inline', 'Regular']).isRequired
}

export default Button;