import styles from "src/styles/demo";
import {Box, Button} from "@mui/material";

interface SendMessageButtonProps {
  message: string;
  onClick: () => void;
}

const SendMessageButton: React.FC<SendMessageButtonProps> = (
  props: SendMessageButtonProps
) => {
  return (
    <Box style={styles.buttonWrapper}>
      <Button
        onClick={() => {
          props.onClick();
        }}
      >
        Send
      </Button>
    </Box>
  );
};

export default SendMessageButton;
