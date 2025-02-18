import { getConnectorIcon } from '@lifi/wallet-management';
import { Wallet } from '@mui/icons-material';
import { Avatar, Badge } from '@mui/material';
import type { Account } from '../hooks/useAccount.js';
import { useChain } from '../hooks/useChain.js';
import { SmallAvatar } from './SmallAvatar.js';
import { AvatarDefault } from './TokenAvatar/TokenAvatar.style.js';

interface AccountAvatarProps {
  chainId?: number;
  account?: Account;
}

export const AccountAvatar = ({ chainId, account }: AccountAvatarProps) => {
  const { chain } = useChain(chainId);

  const avatar = account ? (
    <Avatar
      src={getConnectorIcon(account.connector)}
      alt={account.connector?.name}
      sx={{
        marginRight: chain?.logoURI ? 0 : 1.5,
      }}
    >
      {account.connector?.name[0]}
    </Avatar>
  ) : (
    <AvatarDefault>
      <Wallet sx={{ fontSize: 20 }} />
    </AvatarDefault>
  );

  return chainId && chain?.logoURI ? (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <SmallAvatar src={chain?.logoURI} alt={chain?.name}>
          {chain?.name[0]}
        </SmallAvatar>
      }
    >
      {avatar}
    </Badge>
  ) : (
    avatar
  );
};
