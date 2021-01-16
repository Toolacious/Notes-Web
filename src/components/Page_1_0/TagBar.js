import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import { WrapText } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: "wrap",
        alignItems: "center",
        listStyle: 'none',
        margin: 0,
        height: "32px",
        overflowY: "auto",
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    titlebar: {
        flexGrow: 1,
        fontSize: "14px",
        margin: theme.spacing(0.5),
        outline: "none",
        padding: "1px 6px",
        borderRadius: "12px",
        borderColor: `${theme.palette.divider}`,
        '&:focus': {
            borderColor: theme.palette.text.primary,
        }
    },
}));

export default function TagBar() {
    const classes = useStyles();

    const [tag, setTag] = React.useState('')

    //TODO: backend replace demo data
    const demoTags = ['Angular', 'jQuery', 'Polymer', 'React', 'Angular', 'jQuery', 'Polymer', 'React', 'Angular']
    const [chipData, setChipData] = React.useState(demoTags);

    const updTag = (e) => {
        setTag(e.target.value)
    }

    const handleDelete = (chipToDelete) => {
        let chips = chipData.filter((data, index) => index !== chipToDelete);
        setChipData(chips);

        //TODO: backend delete tag
    };

    const newTag = (e) => {
        if(e.key === 'Enter' && e.target.value !== ''){
            console.log(tag)
            setTag('')
            e.target.value = ''

            //TODO: backend add tag
        }
    }

    return (
        <>  
            <CssBaseline />
            <div className={classes.root}>
                {chipData.map((data, index) => {
                    return (
                        <li key={index}>
                            <Chip
                                size="small"
                                label={data}
                                onDelete={() => handleDelete(index)}
                                className={classes.chip}
                            />
                        </li>
                    );
                })}
                <input className={classes.titlebar} placeholder="New tags" onChange={updTag} onKeyDown={newTag}/>
            </div> 
        </>
    )
}