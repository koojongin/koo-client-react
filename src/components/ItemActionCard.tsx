import styled from 'styled-components';
import React from 'react';
import { Instance } from 'tippy.js';
import { confirmAlert } from 'react-confirm-alert';
import { IItem } from '../interfaces/item';
import { fetchEquipItem, fetchUnequipItem } from '../services/user.service';
import Button from './atoms/button';

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
  item: IItem;
  onConfirm?: () => void;
}) {
  const { onClose, item, onConfirm } = props;
  const { name, id = '', iType = '' } = item;
  const onClickConfirm = async () => {
    onClose();
    await fetchEquipItem({ itemId: id, itemType: iType });
    if (onConfirm) onConfirm();
  };
  return (
    <StyledConfirmModal>
      <div style={{ fontSize: 18 }}>{name}(을/를) 착용 하시겠습니까?</div>
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
function UnequipConfirmModal(props: {
  onClose: () => void;
  item: IItem;
  onConfirm?: (result?: boolean) => void;
}) {
  const { onClose, item, onConfirm } = props;
  const { name, id = '', iType = '' } = item;
  const onClickConfirm = async () => {
    onClose();
    await fetchUnequipItem({ itemId: id, itemType: iType });
    if (onConfirm) onConfirm(true);
  };
  return (
    <StyledConfirmModal>
      <div style={{ fontSize: 18 }}>{name}(을/를) 착용해제 하시겠습니까?</div>
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
  onClickEquipmentResult,
  onClickUnequipmentResult,
}: {
  equip?: boolean;
  unequip?: boolean;
  sell?: boolean;
  item: IItem;
  parent: React.MutableRefObject<{ _tippy: Instance } | null>;
  instance?: Instance | undefined;
  onClickEquipmentResult?: () => void;
  onClickUnequipmentResult?: () => void;
}) {
  const { name } = item;
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
            onConfirm={onClickEquipmentResult}
            item={item}
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
          <UnequipConfirmModal
            onClose={onClose}
            onConfirm={onClickUnequipmentResult}
            item={item}
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
      {sell && <div>팔기</div>}
    </StyledItemActionCard>
  );
}
