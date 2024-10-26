
import React, { useState, useRef } from 'react';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/lara-light-purple/theme.css';  // Tema do PrimeReact
import 'primereact/resources/primereact.min.css';          // Estilos principais
import 'primeicons/primeicons.css'; 

export default function StepsModal({ items }) {
    const [activeIndex, setActiveIndex] = useState(1);
    const toast = useRef(null);

    return (
        <div className="card">
            <Toast ref={toast}></Toast>
            <Steps model={items} activeIndex={0} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} />
        </div>
    )
}
        