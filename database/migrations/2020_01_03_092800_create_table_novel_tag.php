<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableNovelTag extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('novel_tag', function (Blueprint $table) {
            $table->unsignedBigInteger('novel_id');
            $table->foreign('novel_id')->references('id')->on('novel');
            $table->unsignedBigInteger('tag_id');
            $table->foreign('tag_id')->references('id')->on('tag');
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
        Schema::dropIfExists('novel_tag');
    }
}
