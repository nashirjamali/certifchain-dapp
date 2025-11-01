interface WalletConnectProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
  isConnected?: boolean;
  address?: `0x${string}`;
}

export function WalletConnect({
  onConnect,
  onDisconnect,
  isConnected,
  address,
}: WalletConnectProps) {
  return (
    <div>
    </div>
  );
}

