<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableNovel extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('novel', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('url');
            $table->string('title');
            $table->text('content');
            $table->text('thumbnail');
            $table->string('thumbnail_desc');
            $table->enum('status',[1,0,2])->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('novel');
    }
}
