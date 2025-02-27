export const FieldType = {
    DESERT: 0,
    BRIDGE_HOR: 1,
    BRIDGE_VERT: 2,
    MOUNT_NE: 3,
    MOUNT_SE: 4,
    MOUNT_SW: 5,
    MOUNT_NW: 6,
    OASIS: 7
}

export const Exits ={
    NORTH: 1,
    EAST:2,
    SOUTH:3,
    WEST:4
}

export class Field {
    Type=FieldType.DESERT
    isRailOn = false;
    choosenExits=[]
}