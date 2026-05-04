import os
import PyPDF2

def merge_pdfs(config, output_path):
    """
    config: list of dicts or strings
    [{'path': '...', 'pages': (0, 1)}, 'path/to/full/pdf']
    """
    merger = PyPDF2.PdfMerger()
    try:
        for item in config:
            if isinstance(item, dict):
                path = item['path']
                pages = item.get('pages') # tuple (start, end)
                if os.path.exists(path):
                    merger.append(path, pages=pages)
                else:
                    print(f"File not found: {path}")
            else:
                if os.path.exists(item):
                    merger.append(item)
                else:
                    print(f"File not found: {item}")
        
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        merger.write(output_path)
        merger.close()
        print(f"Successfully created: {output_path}")
    except Exception as e:
        print(f"Error creating {output_path}: {e}")

base_dir = r"C:\Users\221143\.gemini\antigravity\scratch\car-doc-app\assets\pdf"
out_dir = os.path.join(base_dir, "merged")

# 委任状
merge_pdfs([
    os.path.join(base_dir, "委任状.pdf"),
    os.path.join(base_dir, "委任状（見本）.pdf")
], os.path.join(out_dir, "委任状_統合.pdf"))

# 申請依頼書 (購入)
merge_pdfs([
    os.path.join(base_dir, "申請依頼書.pdf"),
    os.path.join(base_dir, "申請依頼書（購入見本）.pdf")
], os.path.join(out_dir, "申請依頼書_購入_統合.pdf"))

# 申請依頼書 (売却)
merge_pdfs([
    os.path.join(base_dir, "申請依頼書.pdf"),
    os.path.join(base_dir, "申請依頼書（売却見本）.pdf")
], os.path.join(out_dir, "申請依頼書_売却_統合.pdf"))

# 譲渡証明書
merge_pdfs([
    os.path.join(base_dir, "譲渡証明書.pdf"),
    os.path.join(base_dir, "譲渡証明書（見本）.pdf")
], os.path.join(out_dir, "譲渡証明書_統合.pdf"))

# 自認書 (見本PDFの1ページ目を使用)
merge_pdfs([
    os.path.join(base_dir, "自認書.pdf"),
    {'path': os.path.join(base_dir, "自認書・承諾書（見本）.pdf"), 'pages': (0, 1)}
], os.path.join(out_dir, "自認書_統合.pdf"))

# 保管場所使用承諾書 (見本PDFの2ページ目を使用)
merge_pdfs([
    os.path.join(base_dir, "保管場所使用承諾書.pdf"),
    {'path': os.path.join(base_dir, "自認書・承諾書（見本）.pdf"), 'pages': (1, 2)}
], os.path.join(out_dir, "保管場所使用承諾書_統合.pdf"))

# 見取り図・配置図 (原紙 + 見本① + 見本②)
merge_pdfs([
    os.path.join(base_dir, "見取り図・配置図.pdf"),
    os.path.join(base_dir, "見取り図・配置図（見本①）.pdf"),
    os.path.join(base_dir, "見取り図・配置図（見本②）.pdf")
], os.path.join(out_dir, "見取り図・配置図_統合.pdf"))

# 車庫証明委任状
merge_pdfs([
    os.path.join(base_dir, "車庫証明委任状.pdf"),
    os.path.join(base_dir, "車庫証明委任状（見本）.pdf")
], os.path.join(out_dir, "車庫証明委任状_統合.pdf"))

# 古い統合ファイルを削除 (車庫証明セット_統合.pdf)
old_set_path = os.path.join(out_dir, "車庫証明セット_統合.pdf")
if os.path.exists(old_set_path):
    os.remove(old_set_path)
    print(f"Removed old file: {old_set_path}")
