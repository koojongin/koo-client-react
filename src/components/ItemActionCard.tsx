import styled from 'styled-components';
import React, { useContext } from 'react';
import { Instance } from 'tippy.js';
import { confirmAlert } from 'react-confirm-alert';
import { IItem } from '../interfaces/item';
import { fetchEquipItem, fetchUnequipItem } from '../services/user.service';
import Button from './atoms/button';
import { fetchSellItem } from '../services/game.service';
import { SocketContext } from '../context/SocketContext';
import { SHARE_ITEM_LINK } from '../constants/socket.event';

const StyledItemActionCard = styled.div`
  *::selection {
    user-select: none;
  }
  background: #2b2a2a;
  min-width: 150px;
  color: white;
  text-align: center;
  box-shadow: 1px 1px 6px 1px #b5aeae;
  .btn-action {
    padding: 3px 5px;
  }
  .tippy-content {
    padding: 0;
  }
`;
const StyledConfirmModal = styled.div`
  padding: 15px;
  min-width: 400px;
  min-height: 20px;
  border-radius: 5px;
  box-shadow: 0 6px 6px hsl(0deg 0% 0% / 0.3);
`;
function ConfirmModal(props: {
  onClose: () => void;
  onConfirm?: () => void;
  content: string | JSX.Element;
}) {
  const { content, onClose, onConfirm } = props;
  const onClickConfirm = async () => {
    onClose();
    if (onConfirm) onConfirm();
  };
  return (
    <StyledConfirmModal>
      <div style={{ fontSize: 18 }}>{content}</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={onClickConfirm}
          style={{ marginRight: 5 }}
        >
          <Button style={{ lineHeight: 1 }}>확인</Button>
        </div>
        <div tabIndex={0} role="button" onClick={onClose}>
          <Button style={{ lineHeight: 1 }}>취소</Button>
        </div>
      </div>
    </StyledConfirmModal>
  );
}
// type ItemActionKind = 'equip' | 'unequip' | 'sell';
export default function ItemActionCard({
  item,
  parent,
  equip = false,
  unequip = false,
  sell = false,
  link = false,
  onClickEquipmentResult,
  onClickUnequipmentResult,
}: {
  equip?: boolean;
  unequip?: boolean;
  sell?: boolean;
  link?: boolean;
  item: IItem;
  parent: React.MutableRefObject<{ _tippy: Instance } | null>;
  instance?: Instance | undefined;
  onClickEquipmentResult?: () => void;
  onClickUnequipmentResult?: () => void;
}) {
  const { socket } = useContext(SocketContext);

  const { name } = item;
  const onClickLinkItem = () => {
    if (!parent.current) return;
    const {
      current: { _tippy: tippyInstance },
    } = parent;
    tippyInstance.unmount();
    socket?.emit(SHARE_ITEM_LINK, { itemId: item.id });
  };
  const onClickEquipment = () => {
    if (!parent.current) return;
    const {
      current: { _tippy: tippyInstance },
    } = parent;
    tippyInstance.unmount();
    confirmAlert({
      // eslint-disable-next-line react/no-unstable-nested-components
      customUI: ({ onClose }) => {
        return (
          <ConfirmModal
            onClose={onClose}
            onConfirm={async () => {
              await fetchEquipItem({ itemId: item.id, itemType: item.iType });
              if (onClickEquipmentResult) onClickEquipmentResult();
            }}
            content={`${item.name}(을/를) 착용 하시겠습니까?`}
          />
        );
      },
    });
  };

  const onClickUnequipment = () => {
    if (!parent.current) return;
    const {
      current: { _tippy: tippyInstance },
    } = parent;
    tippyInstance.unmount();
    confirmAlert({
      // eslint-disable-next-line react/no-unstable-nested-components
      customUI: ({ onClose }) => {
        return (
          <ConfirmModal
            content={`${item.name}(을/를) 착용해제 하시겠습니까?`}
            onClose={onClose}
            onConfirm={async () => {
              await fetchUnequipItem({ itemId: item.id, itemType: item.iType });
              if (onClickUnequipmentResult) onClickUnequipmentResult();
            }}
          />
        );
      },
    });
  };

  const onClickSellItem = () => {
    if (!parent.current) return;
    const {
      current: { _tippy: tippyInstance },
    } = parent;
    tippyInstance.unmount();
    confirmAlert({
      // eslint-disable-next-line react/no-unstable-nested-components
      customUI: ({ onClose }) => {
        return (
          <ConfirmModal
            content={
              <div>
                <div>{item.name}(을/를) 판매하시겠습니까?</div>
                <div>판매가: {item.gold.toLocaleString()}</div>
              </div>
            }
            onClose={onClose}
            onConfirm={async () => {
              await fetchSellItem(item.id);
              if (onClickUnequipmentResult) onClickUnequipmentResult();
            }}
          />
        );
      },
    });
  };

  return (
    <StyledItemActionCard>
      <div style={{ background: 'white', color: 'black', padding: 5 }}>
        {name}
      </div>
      {equip && (
        <div
          className="btn-action"
          onClick={onClickEquipment}
          tabIndex={0}
          role="button"
        >
          착용
        </div>
      )}
      {unequip && (
        <div
          className="btn-action"
          onClick={onClickUnequipment}
          tabIndex={0}
          role="button"
        >
          착용해제
        </div>
      )}
      {sell && (
        <div
          className="btn-action"
          onClick={onClickSellItem}
          tabIndex={0}
          role="button"
        >
          팔기
        </div>
      )}
      {link && (
        <div
          className="btn-action"
          onClick={onClickLinkItem}
          tabIndex={0}
          role="button"
        >
          아이템 링크
        </div>
      )}
    </StyledItemActionCard>
  );
}
