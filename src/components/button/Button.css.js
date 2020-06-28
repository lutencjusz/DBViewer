import styled from 'styled-components';

const RootButton = styled.button`
    color: ${({ theme: { colors }, primary }) => primary ? colors.gray.light : colors.blue.light};
    cursor: inherit;
    border: none;
    background-color: transparent;
    cursor: ${props => props.to || props.onClick || props.type === 'submit' ? 'pointer' : 'default'};
    border: ${({ theme }) => `2px solid ${theme.colors.blue.light}`};
    margin: ${({ theme }) => `${theme.spacing.xs / 2}px`};
    &:hover {
        opacity: .8;
    }
`

export const InlineButton = styled(RootButton)`
    &:hover {
        text-decoration: underline;
        border: ${({ theme }) => `2px solid ${theme.colors.blue.light}`};
    }
`

export const RegularButton = styled(RootButton)`
    background: ${({ theme, primary }) => primary ? theme.colors.blue.light : theme.colors.blue.dark};
    padding: ${({ theme }) => `${theme.spacing.xs / 2}px ${theme.spacing.xs}px`};
    border-radius: 3px;
`