module.exports = {
    '.form-item': {
        // background: 'green',
        display: 'flex',
        flexDirection: 'column',
        padding: '5px',
        justifyContent: 'center',
    },
    
    "[class^='input-']":{
        boxSizing: 'border-box',
        padding: '0px 5px',
        border: '1px solid',
        borderLeft: '6px solid',
        borderColor: '#3699FF',
        borderRadius: '6px',
        display: 'flex',
        '&:focus-within': {
            boxShadow: '0px 0px 8px rgba(54, 153, 255, 0.5)',
        },
        'span': {
            marginRight: '10px',
            hieght: '100%',
            margin: 'auto',
        },
        'input': {
            width: '100%',
            padding: '5px',
            border: 'none',
            marginLeft: '5px',
            '&:focus': {
                outline: 'none'
            },
        }
    },
    "[class^='input-'] [class^='danger']":{
        borderColor: 'red',
    },

"[class^='input-'] [class^='message']": {
        background: 'red',
    }
}