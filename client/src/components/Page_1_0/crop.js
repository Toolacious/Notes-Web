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
    avatar: {
        height: "128px",
        width: "128px",
    },
    headerAvatar: {
        height: "48px",
        width: "48px",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    headerAvatarWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: theme.spacing(3),
    },
    dialogButton: {
        width: "50%",
        fontSize: "18px",
        textTransform: "none",
    },
    dialog: {},
    input: {
        display: "none",
    },
}));

export default function Crop() {
    const {
        user: { userId: id },
    } = useContext(AuthContext);
    const { setAvatar } = useContext(AvatarContext);
    const classes = useStyles();
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
        <>
            <div style={{ height: "60vh", width: "60vw" }}>
                <ReactCrop
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    circularCrop
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
                <label htmlFor="contained-button-file">
                    <Button
                        className={classes.dialogButton}
                        onClick={() => {}}
                        color="primary"
                        component="span"
                    >
                        Upload
                    </Button>
                </label>

                <Button
                    className={classes.dialogButton}
                    disabled={!completedCrop?.width || !completedCrop?.height}
                    onClick={() =>
                        generateDownload(
                            previewCanvasRef.current,
                            completedCrop,
                            upload,
                            id,
                            setAvatar
                        )
                    }
                    color="primary"
                >
                    Save
                </Button>
            </DialogActions>
        </>
    );
}
