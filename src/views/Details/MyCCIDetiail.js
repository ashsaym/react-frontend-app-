import React, { useState } from 'react';
import { Box, Button, TextField, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import api from '../../utils/api';
import configData from '../../config';
import Typography from '@mui/material/Typography';
import '../../assets/scss/DetailsPage/style.scss';

// export default function MyCCIDetail({ data }) {
//     const [commentsEditable, setCommentsEditable] = useState(false);
//     const [comment, setComment] = useState('');
//     return (
//         <Box>
//             {data.map((elem) => (
//                 <Box key={Math.floor(Math.random() * 10)}>
//                     <Box sx={{ marginBottom: 1 }}>
//                         <Typography variant="h4" component="div" color="#212b36">
//                             Serial Number
//                         </Typography>

//                         <Typography variant="body2" color="#637381">
//                             {elem.SerialNumber}
//                         </Typography>
//                     </Box>
//                     <Box sx={{ marginBottom: 1 }}>
//                         <Typography variant="h4" component="div" color="#212b36">
//                             Updated On
//                         </Typography>

//                         <Typography variant="body2" color="#637381">
//                             {elem.updated_on}
//                         </Typography>
//                     </Box>
//                     <Box sx={{ marginBottom: 1 }}>
//                         <Typography variant="h4" component="div" color="#212b36">
//                             Device Name
//                         </Typography>

//                         <Typography variant="body2" color="#637381">
//                             {elem.device_name}
//                         </Typography>
//                     </Box>
//                     <Box sx={{ marginBottom: 1 }}>
//                         <Typography variant="h4" component="div" color="#212b36">
//                             Machine Serial Number
//                         </Typography>

//                         <Typography variant="body2" color="#637381">
//                             {elem.machineSerialNo || 'null'}
//                         </Typography>
//                     </Box>
//                     <Box sx={{ marginBottom: 1 }}>
//                         <Typography variant="h4" component="div" color="#212b36">
//                             Machine Name Series
//                         </Typography>
//                         <Typography variant="body2" color="#637381">
//                             {elem.machineNameSeries || 'null'}
//                         </Typography>
//                     </Box>
//                     <Box sx={{ marginBottom: 1 }}>
//                         <Typography variant="h4" component="div" color="#212b36">
//                             Machine Production Year
//                         </Typography>

//                         <Typography variant="body2" color="#637381">
//                             {elem.machineProductionYear || 'null'}
//                         </Typography>
//                     </Box>
//                     <Box sx={{ marginBottom: 1 }}>
//                         <Typography variant="h4" component="div" color="#212b36">
//                             Comments
//                         </Typography>
//                         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                             <CommentTextField
//                                 commentsEditable={commentsEditable}
//                                 comment={comment}
//                                 APIcomment={elem.comment}
//                                 setComment={setComment}
//                             />
//                             <Box sx={{ marginTop: 1 }}>
//                                 {commentsEditable ? (
//                                     <Button variant="outlined" color="success">
//                                         Save
//                                     </Button>
//                                 ) : (
//                                     <Button
//                                         variant="outlined"
//                                         onClick={() => {
//                                             setCommentsEditable(true);
//                                             setComment(elem.comments);
//                                         }}
//                                     >
//                                         Edit
//                                     </Button>
//                                 )}
//                             </Box>
//                         </Box>
//                     </Box>
//                     <Box sx={{ marginBottom: 1 }}>
//                         <Typography variant="h4" component="div" color="#212b36">
//                             Created On
//                         </Typography>
//                         <Typography variant="body2" color="#637381">
//                             {elem.created_on || 'null'}
//                         </Typography>
//                     </Box>
//                     <Box sx={{ marginBottom: 1 }}>
//                         <Typography variant="h4" component="div" color="#212b36">
//                             Scraped
//                         </Typography>
//                         <Typography variant="body2" color="#637381">
//                             {elem.scrapped ? 'true' : 'false'}
//                         </Typography>
//                     </Box>
//                 </Box>
//             ))}
//         </Box>
//     );
// }
export default function MyCCIDetail({ data, setDataUpdate }) {
    const [commentsEditable, setCommentsEditable] = useState(false);
    const [comment, setComment] = useState('');
    const savingComment = () => {
        api.put(configData.API_SERVER + 'MyCCIs/' + data[0].SerialNumber + '/', {
            SerialNumber: data[0].SerialNumber,
            comments: comment,
            scrapped: true
        })
            .then(() => {
                setCommentsEditable(false);
                setDataUpdate((prevData) => prevData + 'a');
            })
            .catch((err) => {
                console.log(err);
                setCommentsEditable(false);
            });
    };
    if (data[0]) {
        return (
            <Box>
                <Dialog
                    open={commentsEditable}
                    onClose={() => {
                        setCommentsEditable(false);
                    }}
                >
                    <DialogTitle>
                        <h2>Change Comment</h2>
                    </DialogTitle>
                    <DialogContent>
                        <TextField value={comment} onChange={(e) => setComment(e.target.value)} label="Comment" sx={{ marginTop: 1 }} />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="success" onClick={savingComment}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                <Box key={Math.floor(Math.random() * 10)}>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Serial Number
                        </Typography>

                        <Typography variant="body2" color="#637381">
                            {data[0].SerialNumber}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Updated On
                        </Typography>

                        <Typography variant="body2" color="#637381">
                            {data[0].updated_on}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Device Name
                        </Typography>

                        <Typography variant="body2" color="#637381">
                            {data[0].device_name}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Machine Serial Number
                        </Typography>

                        <Typography variant="body2" color="#637381">
                            {data[0].machineSerialNo || 'null'}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Machine Name Series
                        </Typography>
                        <Typography variant="body2" color="#637381">
                            {data[0].machineNameSeries || 'null'}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Machine Production Year
                        </Typography>

                        <Typography variant="body2" color="#637381">
                            {data[0].machineProductionYear || 'null'}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Comments
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body2" color="#637381">
                                {data[0].comments || 'null'}
                            </Typography>
                            <Box sx={{ marginTop: 1 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setCommentsEditable(true);
                                        setComment(data[0].comments);
                                    }}
                                >
                                    Edit
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Created On
                        </Typography>
                        <Typography variant="body2" color="#637381">
                            {data[0].created_on || 'null'}
                        </Typography>
                    </Box>
                    <Box sx={{ marginBottom: 1 }}>
                        <Typography variant="h4" component="div" color="#212b36">
                            Scraped
                        </Typography>
                        <Typography variant="body2" color="#637381">
                            {data[0].scrapped ? 'true' : 'false'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
    } else {
        return <div></div>;
    }
}

const CommentTextField = ({ commentsEditable, comment, APIcomment, setComment }) => {
    return <TextField value={comment} onChange={(e) => setComment(e.target.value)} disabled={!commentsEditable} sx={{ marginTop: 1 }} />;
};
