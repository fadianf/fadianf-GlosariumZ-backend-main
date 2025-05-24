<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Istilah extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'istilah';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'kelas_kata',
        'sinonim',
        'terkait',
        'emoji',
        'kata',
        'deskripsi'
    ];
}
