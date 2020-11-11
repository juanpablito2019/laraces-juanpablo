<?php

namespace App\Exports;

use App\LearnerNovelty;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class LearnerNoveltyExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize
{
    use Exportable;

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return LearnerNovelty::with('learner.group.formationProgram', 'committee', 'noveltyType')->get();
    }

    public function map($learnerNovelty): array
    {
        return [
            $learnerNovelty->learner->document,
            $learnerNovelty->learner->name,
            $learnerNovelty->learner->group->code_tab,
            $learnerNovelty->learner->group->formationProgram->name,
            $learnerNovelty->noveltyType->name,
            $learnerNovelty->committee->date,
            $learnerNovelty->justification
        ];
    }

    public function headings(): array
    {
        return [
            'Documento',
            'Aprendiz',
            'Ficha grupo',
            'Programa formación',
            'Novedad',
            'Fecha Comité',
            'Justificación'
        ];
    }
}
