import {Box} from "@mui/material";
import {useLayoutEffect, useState} from "react";

interface MessageInputProps {
    message: string;
    onChange: (message: string) => void;
    onKeyPress: (event: any) => void;
    onFileRemove: (file: string) => void;
    assets: File[];
}

function useWindowSize() {
    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
        }

        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
}

function getTextWidth(text: string) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context !== null && context !== undefined) {
        context.font = "14px Inter";
        return context.measureText(text).width;
    }
    return 0;
}

const MessageInput: React.FC<MessageInputProps> = (
    props: MessageInputProps
) => {
    const [cursorPosition, setCursorPostions] = useState<number>(0);
    const width = useWindowSize();
    //500 is the width of the rest of the components. So totalWidth-500=widthOfInput
    return (
        <Box style={{display: "flex"}}>
            {getTextWidth(props.message) < width - 500 && (
                <input
                    type="text"
                    onChange={(e: any) => {
                        setCursorPostions(e.currentTarget.selectionStart);
                        props.onChange(e.currentTarget.value);
                    }}
                    aria-describedby="message_help_text"
                    id="message-input-shorter"
                    name="message-input-shorter"
                    value={props.message}
                    autoFocus
                    autoComplete="false"
                    autoSave="false"
                    placeholder="Add your message"
                    style={{
                        border: props.assets.length ? "none" : "1px solid #8891AA",
                        padding: "8px 12px",
                        height: "36px",
                        margin: `${
                            "0 6px " + (props.assets.length ? "12" : "4") + "px 6px"
                        }`,
                        borderRadius: "4px",
                        width: "100%",
                    }}
                    onFocus={(e: any) =>
                        e.currentTarget.setSelectionRange(cursorPosition, cursorPosition)
                    }
                    onKeyPress={props.onKeyPress}
                />
            )}

            {getTextWidth(props.message) >= width - 500 && (
                <textarea
                    onChange={(e: any) => {
                        setCursorPostions(e.currentTarget.selectionStart);
                        props.onChange(e.currentTarget.value);
                    }}
                    aria-describedby="message_help_text"
                    id="message-input"
                    name="message-input"
                    value={props.message}
                    autoFocus
                    style={{
                        border: props.assets.length ? "none" : "1px solid #8891AA",
                        borderRadius: "4px",
                        width: "100%",
                        padding: "8px 12px",
                        minHeight: "36px",
                        margin: `${
                            "0 6px " + (props.assets.length ? "12" : "4") + "px 6px"
                        }`,
                        fontStyle: "normal",
                        fontSize: "14px",
                        lineHeight: "20px",
                        fontFamily: "Inter",
                    }}
                    onFocus={(e: any) =>
                        e.currentTarget.setSelectionRange(cursorPosition, cursorPosition)
                    }
                />
            )}
            {props.assets.length ? (
                <Box
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                >
                    {props.assets.map(({name, size}) => (
                        <div>{name}</div>
                    ))}
                </Box>
            ) : null}
        </Box>
    );
};

export default MessageInput;
