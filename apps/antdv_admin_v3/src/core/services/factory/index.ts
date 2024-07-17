import BaseSelect from "../../components/select/base"
import InputSearchModal from "../../components/modal/input"
import SlotSearchModal from "../../components/modal/slot"
import XTreeSelect from "../../components/select/tree";
import { connect } from "../../components/utils";

const newSelect = connect(BaseSelect);
const newTreeSelect = connect(XTreeSelect)

const newInputSearchModal = connect(InputSearchModal);
const newSlotSearchModal = connect(SlotSearchModal);

export function makeSelect(part) {
  return newSelect(part);
}

export function makeTreeSelect(part) {
  return newTreeSelect(part)
}

export function makeInputSearchModal(part) {
  return newInputSearchModal(part)
}

export function makeSlotSearchModal(part) {
  return newSlotSearchModal(part)
}
