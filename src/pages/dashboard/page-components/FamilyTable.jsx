import React, {useEffect, useState} from 'react';

import {Table} from 'components/table/Table';

import api from 'services/api';
import {ModalService} from 'common/services/modal-service/ModalService';
import {MODAL_TYPES} from 'configs/modal-config';

const FAMILY_COLUMNS = [
    {
        header: 'Name',
        accessor: 'name'
    }
];

function FamilyTable({familyId}) {
    const [members, setMembers] = useState([]);

    const fetchData = async () => {
        await api.family.getFamilyById(familyId).then(async (response) => {
            if (response.ok) {
                const list = await response.json();
                setMembers(list);
            }
        })
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Table
            data={[members]}
            columns={FAMILY_COLUMNS}
        />
    );
}

export {FamilyTable};
