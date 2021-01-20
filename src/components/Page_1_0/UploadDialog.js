import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
    useContext,
} from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useMutation } from "@apollo/react-hooks";
import { UPLOAD_Mutation } from "../../graphql/upload";
import { AuthContext } from "../../routes/auth";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core/styles";

import { AvatarContext } from "../../context/avatarContext";

async function generateDownload(canvas, crop, upload, id, setAvatar) {
    try {
        if (!crop || !canvas) {
            return;
        }
        let url = canvas.toDataURL("image/png");
        await upload({
            variables: {
                id,
                picture: url,
            },
        });
        setAvatar(url);
    } catch (err) {
        console.log(err);
        return err;
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "60vw",
        height: "60vh",
        padding: theme.spacing(0, 3),
    },
    dialogButtonWrapper: {
        display: "flex",
        width: "50%",
        flexGrow: 1,
    },
    dialogButton: {
        display: "flex",
        width: "100%",
        fontSize: "18px",
        textTransform: "none",
        textAlign: "center",
    },
    dialog: {},
    input: {
        display: "none",
    },
}));

export default function UploadDialog(props) {
    const classes = useStyles();
    const { onClose, open } = props;

    const {
        user: { userId: id },
    } = useContext(AuthContext);
    const { setAvatar } = useContext(AvatarContext);
    const [upload] = useMutation(UPLOAD_Mutation);
    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({
        width: 50,
        height: 50,
        aspect: 1 / 1,
    });
    const [completedCrop, setCompletedCrop] = useState(null);

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [completedCrop]);

    return (
        <Dialog
            maxWidth="xl"
            open={open}
            onClose={onClose}
            aria-labelledby="avatarUpload"
        >
            <DialogTitle id="avatarUpload">Upload Avatar</DialogTitle>
            <div className={classes.root}>
                <ReactCrop
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    circularCrop
                    style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        overflow: "auto",
                    }}
                />
                <div>
                    <canvas
                        ref={previewCanvasRef}
                        // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                        style={{
                            width: Math.round(completedCrop?.width ?? 0),
                            height: Math.round(completedCrop?.height ?? 0),
                            display: "none",
                        }}
                    />
                </div>
            </div>
            <DialogActions>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={onSelectFile}
                />
                <label
                    htmlFor="contained-button-file"
                    className={classes.dialogButtonWrapper}
                >
                    <Button
                        className={classes.dialogButton}
                        onClick={() => {}}
                        color="primary"
                        component="span"
                    >
                        Upload
                    </Button>
                </label>
                <div className={classes.dialogButtonWrapper}>
                    <Button
                        className={classes.dialogButton}
                        disabled={
                            !completedCrop?.width || !completedCrop?.height
                        }
                        onClick={() => {
                            generateDownload(
                                previewCanvasRef.current,
                                completedCrop,
                                upload,
                                id,
                                setAvatar
                            );
                            onClose();
                        }}
                        color="primary"
                    >
                        Save
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
}
